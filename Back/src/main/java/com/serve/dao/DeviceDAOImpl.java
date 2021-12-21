package com.serve.dao;

import com.serve.model.Device;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

@Repository
public class DeviceDAOImpl extends BaseCrudDAOImpl<Device> implements DeviceDAO {

    public DeviceDAOImpl(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

}
