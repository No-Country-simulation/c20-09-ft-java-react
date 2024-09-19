package com.school.service.interfaces;

public interface GenericService <T, D1, D2, R, D3, D4, D5>  {

    R create(D1 dto);

    D4 update(Long id, D2 dto);

    D3 findById(Long id);

    D5 delete(Long id);
}
