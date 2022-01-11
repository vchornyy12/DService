package com.serve.controller;

import com.serve.dto.DeviceDTO;
import com.serve.service.DeviceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
public class DeviceController {
    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }


    @PostMapping()
    public ResponseEntity<?> create(@RequestBody DeviceDTO deviceDTO) {
        DeviceDTO deviceDTO1 = deviceService.create(deviceDTO);
        return ResponseEntity.ok().body(deviceDTO1);
    }


    @GetMapping("/{id}")
    public ResponseEntity<DeviceDTO> get(@PathVariable("id") Long id) {
        DeviceDTO deviceDTO = deviceService.get(id);
        return ResponseEntity.ok().body(deviceDTO);
    }


    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody DeviceDTO deviceDTO) {
        deviceService.update(deviceDTO);
        return ResponseEntity.noContent().build();
    }


    @CrossOrigin
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
}