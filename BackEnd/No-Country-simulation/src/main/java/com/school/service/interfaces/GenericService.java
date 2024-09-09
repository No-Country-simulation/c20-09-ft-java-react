package com.school.service.interfaces;

import java.util.Optional;

public interface GenericService <T, D1, D2, R>  {

    R create(D1 dto);

    T update(Long id, D2 dto);

    Optional<T> findById(Long id);

    void delete(Long id);
}
