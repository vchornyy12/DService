package com.serve.mapper;

import com.serve.dto.OwnerDTO;
import com.serve.model.Owner;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OwnerMapper {
    OwnerMapper INSTANCE = Mappers.getMapper(OwnerMapper.class);

    OwnerDTO toDto(Owner owner);

    Owner toEntity(OwnerDTO ownerDTO);
}
