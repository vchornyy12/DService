package com.serve.service;

import com.serve.model.Owner;

import java.util.List;

public interface OwnerService {
    Owner create(Owner owner);

    Owner get(Long id);

    Owner update(Owner owner);

    boolean delete(Long id);

    List<Owner> getAll();
}
