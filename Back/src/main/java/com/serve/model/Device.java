// TODO format this class / optimize imports
package com.serve.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.serve.model.enums.DeviceType;
import com.serve.model.enums.Status;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@Entity
@Table(name = "devices")
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    @CreationTimestamp
    @Column(name = "register_date", nullable = false)
    private LocalDateTime registerDate;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "type", length = 128)
    private DeviceType deviseType;

    @Column(name = "model", length = 128, nullable = false)
    private String model;

    @Column(name = "device_code", length = 128)
    private String code;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "devise_status", length = 128)
    private Status status;

    // TODO Avoid FetchType.EAGER
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Owner owner;
}
