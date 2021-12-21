package com.serve.dto;

import com.serve.model.enums.DeviceType;
import com.serve.model.enums.Status;

import java.time.LocalDateTime;

public record DeviceDTO(Long id, LocalDateTime registerDate, DeviceType deviceType,
                        String model, String code, Status status, OwnerDTO ownerDTO) {

}
