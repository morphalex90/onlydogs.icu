// Ad network loader. Inserts the async ad script next to this inline tag.
export const AD_LOADER_SCRIPT = `(function(ebgu){
var d = document,
    s = d.createElement('script'),
    l = d.currentScript || d.scripts[d.scripts.length - 1];
s.settings = ebgu || {};
s.src = "\\/\\/embellishedcoffee.com\\/b_XoVws.diG_l\\/0UYvWscq\\/ReMmU9HuaZpUDlukPPATucd1-OHT\\/YVxxMJTecIt\\/NAzJUJ5TNfj\\/EiyDMpQP";
s.async = true;
s.referrerPolicy = 'no-referrer-when-downgrade';
l.parentNode.insertBefore(s, l);
})({})`
