UPDATE User
    SET name = COALESCE(:name, name),
        surname = COALESCE(:surname, surname),
        age = COALESCE(:age, age)
    WHERE id = :id;
