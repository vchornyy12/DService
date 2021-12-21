package com.serve.mapper;

import com.serve.dto.DeviceDTO;
import com.serve.model.Device;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DeviceMapper {
    DeviceMapper INSTANCE = Mappers.getMapper(DeviceMapper.class);

    DeviceDTO toDto(Device device);

    Device toEntity(DeviceDTO deviceDTO);
}
