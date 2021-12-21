// TODO format this class / optimize imports
package com.serve.service;

import com.serve.dao.DeviceDAO;
import com.serve.model.Device;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DeviceServiceImpl implements DeviceService {
    private final DeviceDAO deviceDAO;

    public DeviceServiceImpl(DeviceDAO deviceDAO) {
        this.deviceDAO = deviceDAO;
    }


    @Override
    @Transactional
    public Device create(Device device) {
        return deviceDAO.create(device);
    }

    @Override
    // TODO why do you need a transaction here?

    // TODO why not importing the class?
    @Transactional(readOnly = true)
    public Device get(Long id) {
        Device device = deviceDAO.get(id);
        device.getOwner().getFirstName();
        return device;
       // return deviceDAO.get(id);
    }

    @Override
    @Transactional
    public Device update(Device device) {
        // TODO the line above could be returned
        return deviceDAO.update(device);
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
    public List<com.serve.model.Device> getAll() {
        List<Device> devices = deviceDAO.getAll();
        for(Device device : devices){
            device.getOwner().getFirstName();
        }
        return devices;
    }


}