import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Breed } from '@/contex/BreedContext';
import telegram from '@/img/telegram.png';

export default function Header() {
    const [categories, setCategories] = useState([]);
    const [breeds, setBreeds] = useState([]);

    const router = useRouter();

    const { breed, setBreed } = useContext(Breed);

    useEffect(() => {
        getCategories();

        if (router.pathname !== '/category/[category_id]') {
            getBreeds();
        }
    }, [breed]);

    const getCategories = () => {
        axios
            .get('https://api.thedogapi.com/v1/categories?page=0&limit=15&api_key=' + process.env.NEXT_PUBLIC_CAT_API)
            .then((res) => { setCategories(res.data); })
        // .catch((err) => { console.log(err); });
    }

    const getBreeds = () => {
        axios
            .get('https://api.thedogapi.com/v1/breeds?page=0&limit=100&api_key=' + process.env.NEXT_PUBLIC_CAT_API)
            .then((res) => { setBreeds(res.data); })
        // .catch((err) => { console.log(err); });
    }

    return (
        <header className="header">
            <div className="header__container">

                <div className="header__logo">
                    <Link href='/'>OnlyDogs</Link>
                </div>

                <div className="header__categories">
                    {categories.length > 0 &&
                        <nav>
                            <ul className="header__categories__list">
                                {(categories.map((cat: any) =>
                                    <li key={cat.id}><Link href={'/category/' + cat.id} className={router.asPath === ('/category/' + cat.id) ? 'is-active' : ''}>{cat.name}</Link></li>
                                ))}
                                <li><Link href="https://t.me/+C6ZhfIzJVL84M2M0" target="_blank" rel="noreferrer"><Image src={telegram} height="20" width="20" alt="Telegram" title="Join the Telegram channel" /></Link></li>
                            </ul>
                        </nav>
                    }
                </div>

                <div className="header__breeds">
                    {breeds.length > 0 &&
                        <nav>
                            <ul className="header__breeds__list">
                                {(breeds.map((tmpBreed: any) =>
                                    <li key={tmpBreed.id}><button type="button" onClick={() => setBreed(tmpBreed.id)}>{tmpBreed.name}</button></li>
                                ))}
                            </ul>
                        </nav>
                    }
                </div>
            </div>
        </header>
    );
}
