package com.serve.dao;

import java.util.List;

public interface BaseCrudDAO<T> {

    T create(T t);

    T get(Long id);

    T update(T t);

    boolean delete(Long id);

    List<T> getAll();

}
