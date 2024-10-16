type Props = Readonly<{
  height?: number;
  width?: number;
}>;

export default function LogoComboMark({ height = 20 }: Props) {
  return (
    <svg
      height={height}
      viewBox="0 0 132 20"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M37.1916 19.5985C36.3749 19.5985 35.6745 19.486 35.0906 19.2611C34.5105 19.0402 34.0489 18.7383 33.7056 18.3556C33.3623 17.9729 33.1394 17.5428 33.0368 17.0653L35.3687 16.7517C35.4397 16.9332 35.5522 17.1028 35.7061 17.2607C35.86 17.4185 36.0632 17.5447 36.3157 17.6394C36.5722 17.7381 36.8839 17.7874 37.2508 17.7874C37.7993 17.7874 38.2511 17.6533 38.6062 17.3849C38.9652 17.1206 39.1448 16.6767 39.1448 16.0533V14.3902H39.0382C38.9278 14.6427 38.762 14.8814 38.5411 15.1063C38.3201 15.3312 38.036 15.5147 37.6888 15.6567C37.3416 15.7988 36.9273 15.8698 36.4459 15.8698C35.7633 15.8698 35.1418 15.712 34.5816 15.3963C34.0252 15.0767 33.5813 14.5894 33.2499 13.9344C32.9224 13.2755 32.7586 12.4429 32.7586 11.4368C32.7586 10.407 32.9263 9.5468 33.2617 8.8563C33.5971 8.1658 34.043 7.64891 34.5993 7.30563C35.1596 6.96236 35.7732 6.79072 36.44 6.79072C36.949 6.79072 37.3751 6.87753 37.7184 7.05114C38.0617 7.2208 38.3379 7.43387 38.547 7.69034C38.7601 7.94287 38.9238 8.19145 39.0382 8.43608H39.1329V6.90909H41.6365V16.0888C41.6365 16.8621 41.4471 17.5092 41.0683 18.0301C40.6895 18.5509 40.1647 18.9415 39.494 19.2019C38.8271 19.4663 38.0597 19.5985 37.1916 19.5985ZM37.2449 13.9759C37.6513 13.9759 37.9946 13.8752 38.2747 13.674C38.5588 13.4688 38.7758 13.1768 38.9258 12.7981C39.0797 12.4153 39.1566 11.9576 39.1566 11.425C39.1566 10.8923 39.0816 10.4306 38.9317 10.04C38.7818 9.64544 38.5647 9.33965 38.2807 9.12263C37.9966 8.90562 37.6513 8.79711 37.2449 8.79711C36.8306 8.79711 36.4814 8.90956 36.1973 9.13447C35.9132 9.35543 35.6982 9.66319 35.5522 10.0578C35.4062 10.4523 35.3332 10.9081 35.3332 11.425C35.3332 11.9497 35.4062 12.4035 35.5522 12.7862C35.7021 13.165 35.9172 13.459 36.1973 13.6681C36.4814 13.8733 36.8306 13.9759 37.2449 13.9759ZM42.4762 16V6.90909H44.9206V8.49527H45.0153C45.181 7.93103 45.4592 7.50489 45.8498 7.21686C46.2404 6.92487 46.6902 6.77888 47.1992 6.77888C47.3255 6.77888 47.4616 6.78677 47.6076 6.80256C47.7536 6.81834 47.8818 6.84004 47.9923 6.86766V9.10488C47.8739 9.06937 47.7102 9.0378 47.5011 9.01018C47.2919 8.98256 47.1006 8.96875 46.927 8.96875C46.5561 8.96875 46.2246 9.04964 45.9326 9.21141C45.6446 9.36924 45.4158 9.5902 45.2461 9.87429C45.0804 10.1584 44.9975 10.4859 44.9975 10.8568V16H42.4762ZM51.849 16.1776C50.9139 16.1776 50.109 15.9882 49.4342 15.6094C48.7635 15.2266 48.2466 14.6861 47.8836 13.9877C47.5206 13.2854 47.3391 12.4548 47.3391 11.496C47.3391 10.5608 47.5206 9.74014 47.8836 9.03385C48.2466 8.32757 48.7576 7.77715 49.4165 7.38258C50.0794 6.98801 50.8567 6.79072 51.7484 6.79072C52.3481 6.79072 52.9065 6.88739 53.4234 7.08073C53.9442 7.27012 54.3979 7.55619 54.7846 7.93892C55.1752 8.32165 55.4791 8.80303 55.6961 9.38305C55.9131 9.95912 56.0216 10.6338 56.0216 11.4072V12.0997H48.3452V10.5372H53.6483C53.6483 10.1742 53.5693 9.85259 53.4115 9.57244C53.2537 9.2923 53.0347 9.07331 52.7546 8.91548C52.4784 8.75371 52.1568 8.67282 51.7898 8.67282C51.4071 8.67282 51.0678 8.7616 50.7718 8.93916C50.4799 9.11277 50.251 9.34754 50.0853 9.64347C49.9196 9.93545 49.8347 10.261 49.8308 10.62V12.1056C49.8308 12.5554 49.9136 12.944 50.0794 13.2715C50.249 13.599 50.4877 13.8516 50.7955 14.0291C51.1033 14.2067 51.4683 14.2955 51.8904 14.2955C52.1706 14.2955 52.4271 14.256 52.6599 14.1771C52.8927 14.0982 53.0919 13.9798 53.2576 13.822C53.4234 13.6641 53.5496 13.4708 53.6364 13.242L55.9683 13.3958C55.85 13.9561 55.6073 14.4454 55.2404 14.8636C54.8773 15.2779 54.4078 15.6015 53.8317 15.8343C53.2596 16.0631 52.5987 16.1776 51.849 16.1776ZM59.0926 16.1716C58.5126 16.1716 57.9957 16.071 57.542 15.8698C57.0882 15.6646 56.7291 15.3628 56.4648 14.9643C56.2044 14.5618 56.0742 14.0607 56.0742 13.4609C56.0742 12.9559 56.1669 12.5317 56.3523 12.1884C56.5378 11.8452 56.7903 11.569 57.1099 11.3598C57.4295 11.1507 57.7925 10.9929 58.1989 10.8864C58.6093 10.7798 59.0394 10.7049 59.4892 10.6615C60.0179 10.6062 60.444 10.5549 60.7676 10.5076C61.0911 10.4563 61.3259 10.3813 61.4719 10.2827C61.6179 10.184 61.6909 10.038 61.6909 9.8447V9.80919C61.6909 9.43434 61.5725 9.14433 61.3358 8.93916C61.103 8.73398 60.7715 8.63139 60.3414 8.63139C59.8877 8.63139 59.5267 8.73201 59.2583 8.93324C58.99 9.13052 58.8125 9.3791 58.7257 9.67898L56.3938 9.48958C56.5121 8.93718 56.7449 8.45975 57.0922 8.05729C57.4394 7.65088 57.8872 7.33917 58.4357 7.12216C58.9881 6.9012 59.6273 6.79072 60.3533 6.79072C60.8583 6.79072 61.3417 6.84991 61.8033 6.96828C62.2689 7.08665 62.6812 7.27012 63.0403 7.5187C63.4033 7.76728 63.6894 8.08688 63.8985 8.47751C64.1076 8.86419 64.2122 9.32781 64.2122 9.86837V16H61.8211V14.7393H61.7501C61.6041 15.0234 61.4088 15.274 61.1641 15.491C60.9195 15.7041 60.6255 15.8718 60.2823 15.9941C59.939 16.1125 59.5424 16.1716 59.0926 16.1716ZM59.8147 14.4316C60.1856 14.4316 60.5131 14.3586 60.7972 14.2126C61.0813 14.0627 61.3042 13.8614 61.466 13.6089C61.6277 13.3564 61.7086 13.0703 61.7086 12.7507V11.786C61.6297 11.8373 61.5212 11.8846 61.3831 11.928C61.249 11.9675 61.097 12.005 60.9274 12.0405C60.7577 12.072 60.588 12.1016 60.4184 12.1293C60.2487 12.1529 60.0948 12.1746 59.9567 12.1944C59.6608 12.2378 59.4024 12.3068 59.1814 12.4015C58.9604 12.4962 58.7888 12.6244 58.6665 12.7862C58.5442 12.944 58.483 13.1413 58.483 13.3781C58.483 13.7214 58.6073 13.9837 58.8559 14.1652C59.1084 14.3428 59.428 14.4316 59.8147 14.4316ZM69.8371 6.90909V8.80303H64.3624V6.90909H69.8371ZM65.6053 4.73106H68.1266V13.2064C68.1266 13.4392 68.1621 13.6207 68.2331 13.7509C68.3042 13.8772 68.4028 13.966 68.5291 14.0173C68.6593 14.0686 68.8092 14.0942 68.9789 14.0942C69.0972 14.0942 69.2156 14.0844 69.334 14.0646C69.4524 14.041 69.5431 14.0232 69.6062 14.0114L70.0028 15.8875C69.8765 15.927 69.699 15.9724 69.4701 16.0237C69.2413 16.0789 68.9631 16.1125 68.6356 16.1243C68.028 16.148 67.4953 16.0671 67.0376 15.8816C66.5838 15.6962 66.2307 15.4081 65.9782 15.0175C65.7256 14.6269 65.6013 14.1337 65.6053 13.5379V4.73106ZM75.2015 6.90909V8.80303H69.5907V6.90909H75.2015ZM70.8751 16V6.25213C70.8751 5.5932 71.0033 5.04672 71.2598 4.61269C71.5202 4.17866 71.8753 3.85314 72.3251 3.63613C72.7749 3.41911 73.2859 3.31061 73.858 3.31061C74.2447 3.31061 74.5978 3.3402 74.9174 3.39938C75.241 3.45857 75.4817 3.51184 75.6395 3.55919L75.1897 5.45313C75.091 5.42156 74.9687 5.39197 74.8227 5.36435C74.6807 5.33673 74.5347 5.32292 74.3848 5.32292C74.0139 5.32292 73.7554 5.40972 73.6094 5.58333C73.4634 5.753 73.3904 5.99171 73.3904 6.29948V16H70.8751ZM75.5752 16V6.90909H78.0195V8.49527H78.1142C78.2799 7.93103 78.5581 7.50489 78.9487 7.21686C79.3394 6.92487 79.7892 6.77888 80.2982 6.77888C80.4244 6.77888 80.5606 6.78677 80.7066 6.80256C80.8525 6.81834 80.9808 6.84004 81.0913 6.86766V9.10488C80.9729 9.06937 80.8091 9.0378 80.6 9.01018C80.3909 8.98256 80.1995 8.96875 80.0259 8.96875C79.655 8.96875 79.3236 9.04964 79.0316 9.21141C78.7436 9.36924 78.5147 9.5902 78.345 9.87429C78.1793 10.1584 78.0965 10.4859 78.0965 10.8568V16H75.5752ZM84.9125 16.1776C83.9931 16.1776 83.1981 15.9822 82.5273 15.5916C81.8605 15.197 81.3455 14.6486 80.9825 13.9463C80.6195 13.24 80.438 12.4212 80.438 11.4901C80.438 10.551 80.6195 9.73027 80.9825 9.02794C81.3455 8.32165 81.8605 7.7732 82.5273 7.38258C83.1981 6.98801 83.9931 6.79072 84.9125 6.79072C85.8318 6.79072 86.6249 6.98801 87.2917 7.38258C87.9625 7.7732 88.4794 8.32165 88.8424 9.02794C89.2054 9.73027 89.3869 10.551 89.3869 11.4901C89.3869 12.4212 89.2054 13.24 88.8424 13.9463C88.4794 14.6486 87.9625 15.197 87.2917 15.5916C86.6249 15.9822 85.8318 16.1776 84.9125 16.1776ZM84.9243 14.2244C85.3425 14.2244 85.6917 14.1061 85.9719 13.8693C86.252 13.6286 86.4631 13.3011 86.6052 12.8868C86.7512 12.4725 86.8242 12.001 86.8242 11.4723C86.8242 10.9436 86.7512 10.4721 86.6052 10.0578C86.4631 9.64347 86.252 9.31597 85.9719 9.07528C85.6917 8.8346 85.3425 8.71425 84.9243 8.71425C84.5021 8.71425 84.147 8.8346 83.859 9.07528C83.5749 9.31597 83.3598 9.64347 83.2138 10.0578C83.0718 10.4721 83.0008 10.9436 83.0008 11.4723C83.0008 12.001 83.0718 12.4725 83.2138 12.8868C83.3598 13.3011 83.5749 13.6286 83.859 13.8693C84.147 14.1061 84.5021 14.2244 84.9243 14.2244ZM92.381 10.7443V16H89.8597V6.90909H92.2626V8.51302H92.3691C92.5704 7.9843 92.9077 7.56605 93.3812 7.25829C93.8547 6.94658 94.4288 6.79072 95.1035 6.79072C95.7348 6.79072 96.2853 6.92882 96.7548 7.20502C97.2243 7.48122 97.5893 7.87579 97.8497 8.38873C98.1101 8.89773 98.2404 9.50537 98.2404 10.2116V16H95.719V10.6615C95.723 10.1051 95.5809 9.67109 95.2929 9.35938C95.0049 9.04372 94.6083 8.88589 94.1033 8.88589C93.7639 8.88589 93.4641 8.95889 93.2037 9.10488C92.9472 9.25087 92.746 9.46394 92.6 9.74408C92.4579 10.0203 92.3849 10.3537 92.381 10.7443ZM103.896 6.90909V8.80303H98.4216V6.90909H103.896ZM99.6645 4.73106H102.186V13.2064C102.186 13.4392 102.221 13.6207 102.292 13.7509C102.363 13.8772 102.462 13.966 102.588 14.0173C102.719 14.0686 102.868 14.0942 103.038 14.0942C103.156 14.0942 103.275 14.0844 103.393 14.0646C103.512 14.041 103.602 14.0232 103.665 14.0114L104.062 15.8875C103.936 15.927 103.758 15.9724 103.529 16.0237C103.301 16.0789 103.022 16.1125 102.695 16.1243C102.087 16.148 101.555 16.0671 101.097 15.8816C100.643 15.6962 100.29 15.4081 100.037 15.0175C99.7849 14.6269 99.6606 14.1337 99.6645 13.5379V4.73106ZM108.417 16.1776C107.482 16.1776 106.677 15.9882 106.003 15.6094C105.332 15.2266 104.815 14.6861 104.452 13.9877C104.089 13.2854 103.907 12.4548 103.907 11.496C103.907 10.5608 104.089 9.74014 104.452 9.03385C104.815 8.32757 105.326 7.77715 105.985 7.38258C106.648 6.98801 107.425 6.79072 108.317 6.79072C108.917 6.79072 109.475 6.88739 109.992 7.08073C110.513 7.27012 110.966 7.55619 111.353 7.93892C111.744 8.32165 112.047 8.80303 112.264 9.38305C112.481 9.95912 112.59 10.6338 112.59 11.4072V12.0997H104.914V10.5372H110.217C110.217 10.1742 110.138 9.85259 109.98 9.57244C109.822 9.2923 109.603 9.07331 109.323 8.91548C109.047 8.75371 108.725 8.67282 108.358 8.67282C107.975 8.67282 107.636 8.7616 107.34 8.93916C107.048 9.11277 106.819 9.34754 106.654 9.64347C106.488 9.93545 106.403 10.261 106.399 10.62V12.1056C106.399 12.5554 106.482 12.944 106.648 13.2715C106.817 13.599 107.056 13.8516 107.364 14.0291C107.672 14.2067 108.037 14.2955 108.459 14.2955C108.739 14.2955 108.995 14.256 109.228 14.1771C109.461 14.0982 109.66 13.9798 109.826 13.822C109.992 13.6641 110.118 13.4708 110.205 13.242L112.537 13.3958C112.418 13.9561 112.176 14.4454 111.809 14.8636C111.446 15.2779 110.976 15.6015 110.4 15.8343C109.828 16.0631 109.167 16.1776 108.417 16.1776ZM115.59 10.7443V16H113.069V6.90909H115.472V8.51302H115.578C115.779 7.9843 116.117 7.56605 116.59 7.25829C117.064 6.94658 117.638 6.79072 118.312 6.79072C118.944 6.79072 119.494 6.92882 119.964 7.20502C120.433 7.48122 120.798 7.87579 121.059 8.38873C121.319 8.89773 121.449 9.50537 121.449 10.2116V16H118.928V10.6615C118.932 10.1051 118.79 9.67109 118.502 9.35938C118.214 9.04372 117.817 8.88589 117.312 8.88589C116.973 8.88589 116.673 8.95889 116.413 9.10488C116.156 9.25087 115.955 9.46394 115.809 9.74408C115.667 10.0203 115.594 10.3537 115.59 10.7443ZM125.62 16.148C124.929 16.148 124.304 15.9704 123.744 15.6153C123.187 15.2562 122.745 14.7295 122.418 14.035C122.094 13.3366 121.932 12.4804 121.932 11.4664C121.932 10.4247 122.1 9.55863 122.436 8.86813C122.771 8.17369 123.217 7.65483 123.773 7.31155C124.333 6.96433 124.947 6.79072 125.614 6.79072C126.123 6.79072 126.547 6.87753 126.886 7.05114C127.23 7.2208 127.506 7.43387 127.715 7.69034C127.928 7.94287 128.09 8.19145 128.2 8.43608H128.277V3.87879H130.793V16H128.307V14.544H128.2C128.082 14.7966 127.914 15.0471 127.697 15.2957C127.484 15.5403 127.206 15.7435 126.863 15.9053C126.523 16.0671 126.109 16.148 125.62 16.148ZM126.419 14.1416C126.825 14.1416 127.168 14.0311 127.449 13.8101C127.733 13.5852 127.95 13.2715 128.1 12.8691C128.253 12.4666 128.33 11.9951 128.33 11.4545C128.33 10.914 128.255 10.4444 128.106 10.0459C127.956 9.64741 127.739 9.33965 127.454 9.12263C127.17 8.90562 126.825 8.79711 126.419 8.79711C126.004 8.79711 125.655 8.90956 125.371 9.13447C125.087 9.35938 124.872 9.67109 124.726 10.0696C124.58 10.4681 124.507 10.9298 124.507 11.4545C124.507 11.9833 124.58 12.4508 124.726 12.8572C124.876 13.2597 125.091 13.5754 125.371 13.8042C125.655 14.0291 126.004 14.1416 126.419 14.1416Z"
        fill="currentColor"
      />
      <path
        d="M9.79921 0L13.0591 3.33021L6.53094 9.99349L13.0591 16.6596L9.79081 19.9955L0 10.0021L9.79921 0Z"
        fill="currentColor"
      />
      <path
        d="M16.3272 13.3357L13.0625 16.668L16.3272 20.0003L19.5919 16.668L16.3272 13.3357Z"
        fill="currentColor"
      />
      <path
        d="M22.8561 13.3332L26.1216 10.0001L19.5906 3.33398L13.0625 10.0001L16.328 13.3332L19.5906 10.0001L22.8561 13.3332Z"
        fill="currentColor"
      />
    </svg>
  );
}
