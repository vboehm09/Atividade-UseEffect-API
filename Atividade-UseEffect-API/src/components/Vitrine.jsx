import { useEffect, useState } from 'react'
import styles from './Vitrine.module.css'

const CATEGORIA = 'smartphones'

export function Vitrine() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const resposta = await fetch(
          `https://dummyjson.com/products/category/${CATEGORIA}`,
        )
        const dados = await resposta.json()
        setProdutos(dados.products ?? [])
      } catch (erro) {
        console.error('Erro ao buscar produtos:', erro)
        setProdutos([])
      } finally {
        setCarregando(false)
      }
    }

    buscarProdutos()
  }, [])

  if (carregando) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p>Carregando catálogo... 📦</p>
      </div>
    )
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <span className={styles.subtitle}>Catálogo em destaque</span>
        <h1 className={styles.tituloMain}>Vitrine de E-commerce</h1>
        <div className={styles.linha}></div>
      </header>

      <section className={styles.grid}>
        {produtos.map((item) => (
          <article key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={item.thumbnail} alt={item.title} className={styles.foto} />
              <span className={styles.category}>{item.category}</span>
            </div>

            <div className={styles.info}>
              <h3 className={styles.produtoNome}>{item.title}</h3>
              <p className={styles.descricao}>{item.description}</p>

              <div className={styles.footerCard}>
                <div className={styles.precoContainer}>
                  <span className={styles.cifra}>R$</span>
                  <span className={styles.valor}>{item.price}</span>
                </div>
                <button type="button" className={styles.botao}>
                  Adicionar
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Vitrine