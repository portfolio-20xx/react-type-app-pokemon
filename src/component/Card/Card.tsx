import styles from './Card.module.scss';
import { PokemonProps } from '../../utils/pokemon';

interface CardProps {
  pokemon: PokemonProps;
}

const Card = ({ pokemon }: CardProps) => {
  return (
    <div className={styles.Card}>
      <div className={styles.Card__image}>
        <img src={pokemon.sprites.front_default} alt='' />
      </div>
      <h3 className={styles.Card__name}>{pokemon.name}</h3>
      <div className={styles.Card__types}>
        <div>タイプ</div>
        {pokemon.types.map((type)=> {
          return (
            // 名前が重複する可能性が無いと思うので、keyにはtype.type.nameを使用 
            // 重複しないkeyであれば、indexを使用しても問題ないと思う。
            <div key={type.type.name}>
              <span className={styles.Card__typesName}>{type.type.name}</span>
            </div>
          )
        })}
      </div>
      <div className={styles.Card__info}>
        <div className={styles.Card__infoData}>
          <p className={styles.Card__infoDataText}>重さ：{pokemon.weight}</p>
        </div>
        <div className={styles.Card__infoData}>
          <p className={styles.Card__infoDataText}>高さ：{pokemon.height}</p>
        </div>
        <div className={styles.Card__infoData}>
          <p className={styles.Card__infoDataText}>アビリティ：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Card

