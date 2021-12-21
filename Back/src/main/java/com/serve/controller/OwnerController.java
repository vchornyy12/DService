package com.serve.controller;

import com.serve.model.Owner;
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

    //create
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Owner owner) {
        Owner owner1 = ownerService.create(owner);
        return ResponseEntity.ok().body("Owner is created with id: " + owner1.getId().toString());
    }

    //get
    @GetMapping("/{id}")
    public ResponseEntity<Owner> get(@PathVariable("id") Long id) {
        Owner owner = ownerService.get(id);
        return ResponseEntity.ok().body(owner);
    }

    //update
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Owner owner) {
        ownerService.update(owner);
        return ResponseEntity.ok().body("Owner has been updated successfully!");
    }

    //del
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        ownerService.delete(id);
        return ResponseEntity.ok().body("Owner has been deleted successfully!");
    }

    //All list
    @GetMapping()
    public ResponseEntity<List<Owner>> list() {
        List<Owner> owners = ownerService.getAll();
        return ResponseEntity.ok().body(owners);
    }


}

