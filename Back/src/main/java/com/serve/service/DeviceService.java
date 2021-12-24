package com.serve.service;

import com.serve.dto.DeviceDTO;

import java.util.List;

public interface DeviceService {

    DeviceDTO create(DeviceDTO deviceDTO);

    DeviceDTO get(Long id);

    DeviceDTO update(DeviceDTO deviceDTO);

    boolean delete(Long id);

    List<DeviceDTO> getAll();
}
