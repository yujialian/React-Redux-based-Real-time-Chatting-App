export function getRedirectPath({type, avatar}) {
  /*
  Return redirect path based on user's type/information.
  user's type? /boss /talent
  user have avatar? /bossinfo /talentinfo
  */
  let url = (type==='boss')?'/boss':'/talent'
  if(!avatar) {
    url += 'info'
  }
  return url
}
