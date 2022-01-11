package com.serve.controller;

import com.serve.dto.OwnerDTO;
import com.serve.service.OwnerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owners")
public class OwnerController {
    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }


    @PostMapping()
    public ResponseEntity<?> create(@RequestBody OwnerDTO ownerDTO) {
        OwnerDTO ownerDTO1 = ownerService.create(ownerDTO);
        return ResponseEntity.ok().body(ownerDTO1);
    }


    @GetMapping("/{id}")
    public ResponseEntity<OwnerDTO> get(@PathVariable("id") Long id) {
        OwnerDTO ownerDTO = ownerService.get(id);
        return ResponseEntity.ok().body(ownerDTO);
    }


    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody OwnerDTO ownerDTO) {
        ownerService.update(ownerDTO);
        return ResponseEntity.noContent().build();
    }


    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        ownerService.delete(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping()
    public ResponseEntity<List<OwnerDTO>> getAll() {
        List<OwnerDTO> owners = ownerService.getAll();
        return ResponseEntity.ok().body(owners);
    }


}

