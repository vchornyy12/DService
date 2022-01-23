package com.serve.controller;

import com.serve.dto.DeviceDTO;
import com.serve.model.enums.DeviceType;
import com.serve.model.enums.Status;
import com.serve.service.DeviceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/devices")
public class DeviceController {
    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }


    @PostMapping()
    public ResponseEntity<?> create(@RequestBody DeviceDTO deviceDTO) {
        return ResponseEntity.ok().body(deviceService.create(deviceDTO));
    }


    @GetMapping("/{id}")
    public ResponseEntity<DeviceDTO> get(@PathVariable("id") Long id) {
        DeviceDTO deviceDTO = deviceService.get(id);
        return ResponseEntity.ok().body(deviceDTO);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody DeviceDTO deviceDTO) {
        deviceService.update(deviceDTO);
        return ResponseEntity.noContent().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        deviceService.delete(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping()
    public ResponseEntity<List<DeviceDTO>> getAll() {
        List<DeviceDTO> devices = deviceService.getAll();
        return ResponseEntity.ok().body(devices);
    }

    @GetMapping("/devicetypes")
    public ResponseEntity<List<String>> getAllDeviceTypes() {
        List<String> deviceTypes = Arrays.stream(DeviceType.values()).map(value -> value.toString()).collect(Collectors.toList());
        return ResponseEntity.ok().body(deviceTypes);
    }

    @GetMapping("/statuses")
    public ResponseEntity<List<String>> getAllDeviceStatuses() {
        List<String> deviceStatuses = Arrays.stream(Status.values()).map(value -> value.toString()).collect(Collectors.toList());
        return ResponseEntity.ok().body(deviceStatuses);
    }


}