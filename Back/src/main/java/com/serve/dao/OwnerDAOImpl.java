package com.serve.dao;

import com.serve.model.Owner;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

@Repository
public class OwnerDAOImpl extends BaseCrudDAOImpl<Owner> implements OwnerDAO {

    public OwnerDAOImpl(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

}