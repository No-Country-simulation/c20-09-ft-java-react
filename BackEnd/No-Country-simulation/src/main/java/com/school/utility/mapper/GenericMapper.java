package com.school.utility.mapper;

public interface GenericMapper<E, D1, D2, D3> {

    D3 convertToDto(E entity);

    void createFromDto(D1 dto, E entity);

    void updateFromDto(D2 dto, E entity);

}

