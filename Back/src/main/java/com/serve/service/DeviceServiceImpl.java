// TODO format this class / optimize imports
package com.serve.service;

import com.serve.dao.DeviceDAO;
import com.serve.dto.DeviceDTO;
import com.serve.mapper.DeviceMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeviceServiceImpl implements DeviceService {
    private final DeviceDAO deviceDAO;

    public DeviceServiceImpl(DeviceDAO deviceDAO) {
        this.deviceDAO = deviceDAO;
    }


    @Override
    @Transactional
    public DeviceDTO create(DeviceDTO deviceDTO) {
        return DeviceMapper.INSTANCE.toDto(deviceDAO.create(DeviceMapper.INSTANCE.toEntity(deviceDTO)));
    }

    @Override
    // TODO why do you need a transaction here?

    // TODO why not importing the class?
    @Transactional(readOnly = true)
    public DeviceDTO get(Long id) {
        return DeviceMapper.INSTANCE.toDto(deviceDAO.get(id));
    }

    @Override
    @Transactional
    public DeviceDTO update(DeviceDTO deviceDTO) {
        // TODO the line above could be returned
        return DeviceMapper.INSTANCE.toDto(deviceDAO.update(DeviceMapper.INSTANCE.toEntity(deviceDTO)));
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        // TODO the line above could be returned
        return deviceDAO.delete(id);
    }

    @Override
    // TODO why do you need a transaction here?
    @Transactional(readOnly = true)
    public List<DeviceDTO> getAll() {

        return deviceDAO.getAll().stream().map(DeviceMapper.INSTANCE::toDto).collect(Collectors.toList());
    }


}