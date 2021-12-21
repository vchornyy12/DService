package com.serve.dao;

import java.util.List;

public interface BaseCrudDAO<T> {

    T create(T t);

    T get(Long id);

    // TODO Return value of the method is never used
    T update(T t);

    // TODO Return value of the method is never used
    boolean delete(Long id);

    List<T> getAll();

}
