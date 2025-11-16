export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-sky-500 to-blue-600 text-white text-center py-4 text-sm leading-relaxed shadow-inner">
      <p className="font-semibold text-base">มหาวิทยาลัยศรีปทุม</p>
      <p>คณะวิทยาศาสตร์และเทคโนโลยี | สาขาวิทยาการคอมพิวเตอร์ CSI</p>
      <p className="mt-2">
        ติดต่อ: 
        <a
          href="https://www.facebook.com/firstngub/"
          className="underline mx-1 hover:text-yellow-200"
          target="_blank"
        >
          Facebook
        </a>
        |
        <a
          href="https://www.instagram.com/firstngub/"
          className="underline mx-1 hover:text-yellow-200"
          target="_blank"
        >
          Instagram
        </a>
      </p>
    </footer>
  );
}
