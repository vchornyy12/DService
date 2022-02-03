package com.serve.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class OwnerWithoutDevicesDTO {
    private Long id;
    private String firstName;
    private String lastName;
}
