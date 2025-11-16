import myPhoto from "../assets/stdempimg.gif";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-xl mx-auto">
      <img
        src={myPhoto}
        alt="student"
        className="w-36 h-36 rounded-full border-4 border-sky-400 shadow-lg mb-4 hover:scale-105 transition-transform"
      />
      <h2 className="text-2xl font-bold text-sky-700">นายมนัสวิน ทองดี</h2>
      <p className="text-gray-700">รหัสนักศึกษา: 67091885</p>
      <p className="text-gray-700">
        ชั้นปีที่ 2 | สาขาวิทยาการคอมพิวเตอร์ | คณะวิทยาศาสตร์และเทคโนโลยี
      </p>
      <p className="mt-4 text-sky-800 text-lg leading-relaxed max-w-md">
        สวัสดีครับ ผมชอบการพัฒนาเว็บไซต์และเทคโนโลยีใหม่ ๆ โดยเฉพาะงาน Frontend/Backend
        และอยากฝึก React ให้คล่องขึ้นเรื่อย ๆ ครับ 
      </p>
    </div>
  );
}
