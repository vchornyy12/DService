package com.serve.controller;

import com.serve.model.Device;
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

    //save
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Device device) {
        Device device1 = deviceService.create(device);
        return ResponseEntity.ok().body("Device is created with id: " + device1.getId().toString());
    }

    //get
    @GetMapping("/{id}")
    public ResponseEntity<Device> get(@PathVariable("id") Long id) {
        Device device = deviceService.get(id);
        return ResponseEntity.ok().body(device);
    }

    //update
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Device device) {
        deviceService.update(device);
        return ResponseEntity.ok().body("Device has been updated successfully!");
    }

    //del
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        deviceService.delete(id);
        return ResponseEntity.ok().body("Device has been deleted successfully!");
    }

    //All list
    @GetMapping()
    public ResponseEntity<List<Device>> getAll() {
        List<Device> devices = deviceService.getAll();
        return ResponseEntity.ok().body(devices);
    }
}