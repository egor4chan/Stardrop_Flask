from aiogram import Bot, Dispatcher, F, exceptions, types
from aiogram.types import Message, PreCheckoutQuery, ContentType, Update, ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.filters import CommandStart
import asyncio

bot = Bot(token='7662681489:AAHdPwn1v9nQxPvxp8lVutN7S_C5wPDUgEk')
dp = Dispatcher()

@dp.message(CommandStart())
async def successful_payment(message: Message):
    def markup():
        result = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text='Play ⭐️', url='t.me/Stardrop_Gifts_bot?startapp')]
        ])
        return result

    await message.answer('👋🏻 <b>Welcome!</b>\n\nOpen cases and get prizes in the form of Telegram gifts!', parse_mode='html', reply_markup=markup())
    

@dp.pre_checkout_query(lambda query: True)
async def checkout_process(pre_checkout_query: PreCheckoutQuery):
    print("checkout_process")
    await bot.answer_pre_checkout_query(pre_checkout_query.id, ok=True, error_message='error')

@dp.message(F.successful_payment)
async def successful_payment(message: Message):
    print("successful_payment")
    
@dp.errors()
async def exception_handler(update: Update, exception: exceptions.TelegramRetryAfter):
    await bot.answer_pre_checkout_query(pre_checkout_query.id, ok=True, error_message='error')
    return True

async def main():
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())