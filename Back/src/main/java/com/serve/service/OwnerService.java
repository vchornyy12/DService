package com.serve.service;

import com.serve.dto.OwnerDTO;

import java.util.List;

public interface OwnerService {
    OwnerDTO create(OwnerDTO ownerDTO);

    OwnerDTO get(Long id);

    OwnerDTO update(OwnerDTO ownerDTO);

    boolean delete(Long id);

    List<OwnerDTO> getAll();
}
