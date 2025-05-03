
export const formatNumber = (num: number | string, locale: string = "en") => {
  if (locale === "ar") {
    const easternArabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
      .toString()
      .split('')
      .map((digit) => (/\d/.test(digit) ? easternArabicNumerals[Number(digit)] : digit))
      .join('');
  }
  return num.toString();
};
