package com.serve.dto;

import com.serve.model.enums.Status;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DeviceDTO {
    private Long id;
    private LocalDateTime registerDate;
    private String deviceType;
    private String model;
    private String code;
    private Status status;
    private String ownerDTO;
}
