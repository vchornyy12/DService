package com.serve.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OwnerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private List<DeviceWithoutOwnerDTO> devices;
}
