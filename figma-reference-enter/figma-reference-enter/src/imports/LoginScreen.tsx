import imgLoginPage1 from "figma:asset/f1afaf250fa2f5518a1e3ffa72cae52f34f29295.png";
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[rgba(34,34,34,0.25)] col-1 h-[63px] ml-0 mt-0 rounded-[31.5px] row-1 w-[330px]" />
      <p className="col-1 font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[normal] ml-[48px] mt-[22px] not-italic opacity-40 relative row-1 text-[16px] text-white tracking-[0.48px] w-[70px]">{text}</p>
    </div>
  );
}

export default function LoginScreen() {
  return (
    <div className="bg-white relative size-full" data-name="Login Screen">
      <div className="absolute h-[1016px] left-[-577px] opacity-40 top-[-232px] w-[1355px]" data-name="LOGIN-PAGE 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[133.37%] left-[0.07%] max-w-none top-[-11.81%] w-full" src={imgLoginPage1} />
        </div>
      </div>
      <div className="absolute bg-gradient-to-b from-[#7f22fd] h-[599px] left-0 rounded-tl-[55px] rounded-tr-[55px] to-[#3f1479] top-[245px] w-[390px]" />
      <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[-2px] p-[32px] top-[289px]">
        <Text text="Usuário" />
        <Text text="Senha" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] min-w-full not-italic relative shrink-0 text-[12px] text-white tracking-[0.36px] w-[min-content]">Esqueceu a senha?</p>
        <div className="h-[66px] relative shrink-0 w-[330px]" data-name="Button / Secondary">
          <div className="absolute bg-white inset-0 rounded-[33px]" />
          <p className="absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold inset-[34%_20.83%_34%_20.14%] leading-[normal] not-italic text-[#222] text-[16px] text-center tracking-[0.48px]">Entrar</p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold gap-[16px] items-start leading-[normal] left-[4px] not-italic p-[32px] text-[#7f22fd] top-[86px]">
        <p className="relative shrink-0 text-[34px] w-[317px]">Entre na sua conta</p>
        <div className="relative shrink-0 text-[16px] whitespace-nowrap">
          <p className="mb-0">Utilize seu nome de usuário e senha</p>
          <p>cadastrada</p>
        </div>
      </div>
    </div>
  );
}