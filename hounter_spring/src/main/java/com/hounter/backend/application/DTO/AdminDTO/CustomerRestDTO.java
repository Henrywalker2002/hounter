package com.hounter.backend.application.DTO.AdminDTO;

import com.hounter.backend.application.DTO.PostDto.ShortPostResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CustomerRestDTO {
    private Long id;
    private String username;
    private String fullName;
    private String phone;
    private String email;
    private String address;
    private String avatar;
    private Boolean isActive;
    private LocalDate createAt;
    private List<ShortPostResponse> postList;
    private Integer totalPayments;
}
