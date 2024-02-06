import { useEffect, useState } from "react"
import { supabase } from "../helpers/supabaseClient"

const Ranking = () => {
    const [ranking, setRanking] =  useState([]);

    const callSupabase = async () => {
        const {date, error} = await supabase
            .from('Ranking')
            .select('*')
            .order('id', {ascending: false})
        setRanking(date);
    }

    useEffect(() => {
        callSupabase();
    }, [])

  return (
    <div className="content">
      {
        ranking &&
        ranking.map((item, index) => (
            <Item 
                key={index}
                name={item.name}
                score={item.score}
                index={index}
            />
        ))
      }
    </div>
  )
}

export default Ranking
