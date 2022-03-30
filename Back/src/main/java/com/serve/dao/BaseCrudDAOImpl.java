
package com.serve.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.lang.reflect.ParameterizedType;
import java.util.List;

@Repository
public abstract class BaseCrudDAOImpl<T> implements BaseCrudDAO<T> {


    protected final SessionFactory sessionFactory;


    Class<T> classType;


    protected BaseCrudDAOImpl(SessionFactory sessionFactory) {
        this.classType = (Class<T>) ((ParameterizedType) getClass()
                .getGenericSuperclass()).getActualTypeArguments()[0];
        this.sessionFactory = sessionFactory;
    }

    @Override
    public T create(T t) {
        sessionFactory.getCurrentSession().save(t);
        return t;
    }

    @Override
    public T get(Long id) {
        return sessionFactory.getCurrentSession().get(classType, id);
    }


    @Override
    public T update(T t) {
        sessionFactory.getCurrentSession().saveOrUpdate(t);
        return t;
    }

    @Override
    public boolean delete(Long id) {

        T entity = sessionFactory.getCurrentSession().get(classType, id);
        sessionFactory.getCurrentSession().delete(entity);
        return true;
    }

    @Override
    public List<T> getAll() {
        Session session = sessionFactory.getCurrentSession();
        CriteriaBuilder cb = session.getCriteriaBuilder();
        CriteriaQuery<T> cq = cb.createQuery(classType);
        Root<T> root = cq.from(classType);
        cq.select(root);
        return session.createQuery(cq).getResultList();
    }

}
