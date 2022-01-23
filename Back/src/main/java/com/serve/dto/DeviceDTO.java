package com.serve.dto;

import com.serve.model.enums.DeviceType;
import com.serve.model.enums.Status;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
public class DeviceDTO {
    private Long id;
    private DeviceType deviceType;
    private String model;
    private String code;
    private Status status;
    private OwnerDTO owner;
}
