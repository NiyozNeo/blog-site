create database blogsite;

create table users (
    user_id serial not null primary key,
    user_name varchar(30) not null,
    user_password varchar(30) not null,
    user_date timestamp not null default current_timestamp
);

create table if not exists posts (
    post_id serial not null primary key,
    post_title text not null,
    post_author int,
    constraint fk_post_author
        foreign key(post_author)
            references users(user_id)
            on delete cascade,
    post_user varchar(30),
    post_date timestamp not null default current_timestamp
);

create table comments (
    comment_id serial not null primary key,
    comment_title text not null,
    comment_author int,
    constraint fk_comment_author
        foreign key(comment_author)
            references users(user_id)
            on delete cascade,
    comment_post int,
    constraint fk_comment_post
        foreign key(comment_post)
            references posts(post_id)
            on delete cascade,
    comment_user varchar(30),
    comment_date timestamp not null default current_timestamp
);

