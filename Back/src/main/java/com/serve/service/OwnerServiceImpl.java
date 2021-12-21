package com.serve.service;

import com.serve.dao.OwnerDAO;
import com.serve.model.Owner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OwnerServiceImpl implements OwnerService {
    private final OwnerDAO ownerDAO;


    public OwnerServiceImpl(OwnerDAO ownerDAO) {
        this.ownerDAO = ownerDAO;
    }

    @Override
    @Transactional
    public Owner create(Owner owner) {
        return ownerDAO.create(owner);
    }

    @Override
    @Transactional
    public Owner get(Long id) {
        return ownerDAO.get(id);
    }

    @Override
    @Transactional
    public Owner update(Owner owner) {
        ownerDAO.update(owner);
        return owner;
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        ownerDAO.delete(id);
        return true;
    }

    @Override
    @Transactional
    public List<Owner> getAll() {
        List<Owner> owners = ownerDAO.getAll();
        for (Owner owner : owners) {
            owner.getDevices().size();
        }
        return owners;
    }
//        return ownerDAO.getAll();
//    }
}