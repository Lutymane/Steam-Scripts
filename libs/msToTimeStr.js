function msToTimeStr(_t)
{
    let ret = "";
    
    ret = (_t % 1000) + " ms";

    _t = Math.floor(_t / 1000);

    let sec = _t % 60;

    if(sec > 0)
    {
        ret = sec + " sec " + ret;
    }
    
    _t = Math.floor(_t / 60);

    let min = _t % 60;
    
    if(min > 0)
    {
        ret = min + " min " + ret;
    }

    _t = Math.floor(_t / 60);

    if(_t > 0)
    {
        ret = _t + " h " + ret;
    }

    return ret;
}