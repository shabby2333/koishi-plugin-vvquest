import { Context, Logger, Schema } from 'koishi'
import { } from '@koishijs/plugin-http'

export const name = 'vvquest'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

type VVResponse = {
  code: number;
  data: string[];
  msg: string;
}

export function apply(ctx: Context) {
  // write your plugin here
  ctx.command('vv <name:text>', 'vvquest').action(async ({ session }, name) => {
    const res = await ctx.http.get<VVResponse>('https://api.zvv.quest/search', {
      params: {
        q: name,
        n: 1
      }
    })
    // {"code":200,"data":["https://cn-nb1.rains3.com/vvq/images/是学养厚.png","https://cn-nb1.rains3.com/vvq/images/不是脸皮厚的问题.png","https://cn-nb1.rains3.com/vvq/images/这是大的概率.png","https://cn-nb1.rains3.com/vvq/images/非常年轻的时候特别容易有.png","https://cn-nb1.rains3.com/vvq/images/现在已经好多了.png","https://cn-nb1.rains3.com/vvq/images/我觉得有一点敏感.png","https://cn-nb1.rains3.com/vvq/images/看得更为清楚.png","https://cn-nb1.rains3.com/vvq/images/是自我封闭.png"],"msg":""}
    if(res.code == 200) {
      const imgUrl = res?.data?.[0]
      if(imgUrl)
        return <img src={imgUrl} />
    }else {
      ctx.logger.warn(`vv request failed: ${res}`)
    }
  })
}
