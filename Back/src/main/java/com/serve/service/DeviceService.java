package com.serve.service;

import com.serve.model.Device;

import java.util.List;

public interface DeviceService {

    Device create(Device device);

    Device get(Long id);

    Device update(Device device);

    boolean delete(Long id);

    List<Device> getAll();
}
