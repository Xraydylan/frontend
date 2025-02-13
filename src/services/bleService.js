module.exports.parseData = (sensor, data) => {
  var scheme = sensor.parseScheme;
  // 1 byte sensor, 1 byte size, 4 bytes timestamp in milliseconds, the the data starting from 6th byte
  var dataIndex = 6;
  var value = 0;
  var values = [];
  scheme.forEach(element => {
    //var name = element['name'];
    var valueType = element.type;
    var scale = element.scaleFactor;
    var size = 0;

    if (valueType == 'uint8') {
      value = data.getUint8(dataIndex, true) * scale;
      size = 1;
    } else if (valueType == 'uint24') {
      value =
        data.getUint16(dataIndex, true) +
        (data.getUint8(dataIndex + 2, true) << 16);
      size = 3;
    } else if (valueType == 'uint32') {
      value =
        data.getUint16(dataIndex, true) +
        (data.getUint16(dataIndex + 2, true) << 16);
      size = 4;
    } else if (valueType == 'int16') {
      value = data.getInt16(dataIndex, true) * scale;
      size = 2;
    } else if (valueType == 'float') {
      value = data.getFloat32(dataIndex, true) * scale;
      size = 4;
    } else {
      console.log('Error: unknown type');
    }
    //result = result + element.name + ': ' + value + '   ';
    values.push(value);
    dataIndex += size;
  });
  return values;
};

module.exports.floatToBytes = value => {
  var tempArray = new Float32Array(1);
  tempArray[0] = value;
  return new Uint8Array(tempArray.buffer);
};

module.exports.intToBytes = value => {
  var tempArray = new Int32Array(1);
  tempArray[0] = value;
  return new Uint8Array(tempArray.buffer);
};

module.exports.prepareSensorBleObject = sensorArray => {
  const result = {};
  sensorArray.forEach(elm => {
    const bleKey = elm.bleKey;
    delete elm.bleKey;
    result[bleKey] = elm;
  });
  return result;
};

/*
module.exports.findDeviceIdById = (devices, deviceName) => {
  if (deviceName === 'Arduino') deviceName = 'nicla';
  return devices.find(elm =>
    deviceName.toLowerCase().includes(elm.name.toLowerCase())
  )._id;
};*/

module.exports.getBaseDataset = (sensors, datasetName) => {
  const timeSeries = [];
  sensors.forEach(sensor => {
    sensor.parseScheme.forEach(scheme => {
      timeSeries.push({
        name: sensor.name + '_' + scheme.name,
        start: new Date().getTime() + 10000000,
        end: new Date().getTime(),
        data: []
      });
    });
  });

  return {
    name: datasetName,
    start: new Date().getTime() + 10000000,
    end: new Date().getTime(),
    timeSeries: timeSeries
  };
};

module.exports.parseTimeSeriesData = (
  recordedData,
  recordingSensors,
  sensors
) => {
  const timeSeries = [];
  const sensorData = {};
  [...recordingSensors].forEach(sensorKey => {
    sensorData[sensorKey] = recordedData.filter(
      elm => elm.sensor.toString() === sensorKey.toString()
    );
  });
  Object.keys(sensorData).forEach(key => {
    const sensor = sensors[key];
    sensor.parseScheme.forEach((scheme, idx) => {
      const data = sensorData[key].map(elm => {
        return { timestamp: elm.time, datapoint: elm.data[idx] };
      });
      timeSeries.push({ name: sensor.name + '_' + scheme.name, data: data });
    });
  });
  return timeSeries;
};
