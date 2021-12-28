package com.serve.service;

import com.serve.dao.OwnerDAO;
import com.serve.dto.OwnerDTO;
import com.serve.mapper.OwnerMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OwnerServiceImpl implements OwnerService {
    private final OwnerDAO ownerDAO;


    public OwnerServiceImpl(OwnerDAO ownerDAO) {
        this.ownerDAO = ownerDAO;
    }

    @Override
    @Transactional
    public OwnerDTO create(OwnerDTO ownerDTO) {
        return OwnerMapper.INSTANCE.toDto(ownerDAO.create(OwnerMapper.INSTANCE.toEntity(ownerDTO)));
    }

    @Override
    @Transactional
    public OwnerDTO get(Long id) {
        return OwnerMapper.INSTANCE.toDto(ownerDAO.get(id));
    }

    @Override
    @Transactional
    public OwnerDTO update(OwnerDTO ownerDTO) {

        return OwnerMapper.INSTANCE.toDto(ownerDAO.update(OwnerMapper.INSTANCE.toEntity(ownerDTO)));
    }

    @Override
    @Transactional
    public boolean delete(Long id) {

        return ownerDAO.delete(id);
    }

    @Override
    @Transactional
    public List<OwnerDTO> getAll() {
        return ownerDAO.getAll().stream().map(OwnerMapper.INSTANCE::toDto).collect(Collectors.toList());
    }
}