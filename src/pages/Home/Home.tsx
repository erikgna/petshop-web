import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import { BsFillCartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

import { useProduto } from '../../hooks/useProduto';

import styles from './Home.module.scss'

import catChow from '../../../assets/images/cat_chow.webp'
import dogChow from '../../../assets/images/dog_chow.webp'
import goldenPremier from '../../../assets/images/golden_premier.jpg'
import pedigree from '../../../assets/images/pedigree.png'
import whiskas from '../../../assets/images/whiskas.jpg'

import dog from '../../../assets/images/dog.jpg'
import cat from '../../../assets/images/cat.jpg'
import smallPet from '../../../assets/images/smallpet.jpg'
import bigPet from '../../../assets/images/bigpet.jpg'
import healthCare from '../../../assets/images/healthcare.jpg'

const marcas = [
  catChow,
  dogChow,
  goldenPremier,
  pedigree,
  whiskas
]

const categories = [
  {
    name: 'Dog',
    image: dog
  },
  {
    name: 'Cat',
    image: cat
  },
  {
    name: 'Small Pet',
    image: smallPet
  },
  {
    name: 'Big Pet',
    image: bigPet
  },
  {
    name: 'Healthcare',
    image: healthCare
  },
]

export const Home = () => {
  const produtoHook = useProduto()

  const [max, setMax] = useState<number>(window.innerWidth / 320)
  const [min, setMin] = useState<number>(1)

  const [maxMarcas, setMaxMarcas] = useState<number>(window.innerWidth / 150)
  const [minMarcas, setMinMarcas] = useState<number>(1)

  const resize = () => {
    setMax(window.innerWidth / 320)
    setMaxMarcas(window.innerWidth / 150)
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
  }, [])

  useEffect(() => {
    produtoHook.getPagination(0, 4)
  }, [])

  return <div className={styles.Home}>
    <div className={styles.Banners}>
      <div className={styles.BannerLetter}>
        <h2>We have everything your pet need.</h2>
        <p>The care you give all the difference for lifelong health and happines.</p>
        <button className="ButtonPrimary">Shop Now</button>
      </div>
    </div>

    <div className={styles.Categories}>
      <h3>Category</h3>
      <div className={styles.Slider}>
        <AiOutlineArrowRight className={styles.NextButton} onClick={() => {
          if (max < categories.length) {
            setMax((value) => value + 1)
            setMin((value) => value + 1)
          }
        }
        } />
        <AiOutlineArrowLeft className={styles.PreviousButton} onClick={() => {
          if (min !== 1) {
            setMax((value) => value - 1)
            setMin((value) => value - 1)
          }
        }
        } />
        {
          categories.map((item, index) => {
            if ((index + 1) < max && (index + 1) >= min) {
              return <div
                className={styles.CategoryItem}
                key={item.name}
              >
                <img src={item.image} />
                <h4>{item.name}</h4>
              </div>
            }
            else {
              return null
            }
          })
        }
      </div>
    </div>

    <div className={styles.BestSeller}>
      <div className={styles.BannerSeller}>
        <div className="img"></div>
        <h3>We have the best quality<br />pet food</h3>
        <Link to="/">
          Show All
          <IoIosArrowForward />
        </Link>
      </div>
      <div>
        <h4>Best Seller Product</h4>
        <div className={styles.Products}>
          {produtoHook.produtos.map((item) => (
            <div className={styles.ProductCard} key={item.idproduto}>
              <img src={item.foto} className={styles.ProductImage} />
              <h6>{item.nome}</h6>
              <p>${item.valor}</p>
              <div className={styles.Buttons}>
                <div>
                  <AiOutlineMinus />
                  <strong>0</strong>
                  <AiOutlinePlus />
                </div>
                <div className={styles.Cart}>
                  <BsFillCartFill />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="ButtonPrimary">
          More Products
        </button>
      </div>
    </div>

    <div className={styles.NewsForm}>

      <div className={styles.News}>
        <section>
          <div className={styles.Purple}>
            <h6>Need a healthy snack for your pet?</h6>
            <p>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
            </p>
            <strong>Author name 2013</strong>
          </div>

          <div>
            <h6>Need a healthy snack for your pet?</h6>
            <p>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
            </p>
            <strong>Author name 2013</strong>
          </div>
        </section>

        <section>
          <div>
            <h6>Need a healthy snack for your pet?</h6>
            <p>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
            </p>
            <strong>Author name 2013</strong>
          </div>

          <div className={styles.Purple}>
            <h6>Need a healthy snack for your pet?</h6>
            <p>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
            </p>
            <strong>Author name 2013</strong>
          </div>
        </section>
      </div>

      <form>
        <h6>If you have any question, feel free to contact us!</h6>
        <input name='name' type="text" placeholder='Your Name' />
        <input name='email' type="text" placeholder='Your Email' />
        <input name='phone' type="text" placeholder='Your Phone' />
        <textarea name="message" id="message" cols={30} rows={10} placeholder='Your message' />
      </form>

    </div>

    <div className={styles.Marcas}>
      <h3>News and Promotions</h3>
      <div className={styles.Slider}>
        <AiOutlineArrowRight className={styles.NextButton} onClick={() => {
          if (maxMarcas < marcas.length) {
            setMaxMarcas((value) => value + 1)
            setMinMarcas((value) => value + 1)
          }
        }
        } />
        <AiOutlineArrowLeft className={styles.PreviousButton} onClick={() => {
          if (minMarcas !== 1) {
            setMaxMarcas((value) => value - 1)
            setMinMarcas((value) => value - 1)
          }
        }
        } />
        {
          marcas.map((item, index) => {
            if ((index + 1) < maxMarcas && (index + 1) >= minMarcas) {
              return <img
                className={styles.MarcaItem}
                key={item}
                src={item}
              />
            }
            else {
              return null
            }
          })
        }
      </div>
    </div>

  </div>;
};