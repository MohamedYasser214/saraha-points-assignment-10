import { ProviderEnum } from "../../common/enum/user.enum.js";
import { sucessResponse } from "../../common/utils/response.success.js";
import { decrypt, encrypt } from "../../common/utils/security/encrypt.security.js";
import { Compare, Hash } from "../../common/utils/security/hash.security.js";
import * as db_service from "../../DB/db.service.js";
import userModel from "./../../DB/models/user.model.js";


export const signup = async (req, res, next) => {
  try {
    const { userName, age, email, password, gender , phone } = req.body;

    const emailExist = await db_service.findOne({
      model: userModel,
      filter: { email },
    });
    if (emailExist) {
      throw new Error("email already Exist");
    }

    const user = await db_service.create({
      model: userModel,
      data: { userName, age, email, password:Hash({plainText:password}), gender , phone:encrypt(phone) },
    });

    sucessResponse({ res, status: 201, data: user });
  } catch (error) {
    return res.status(404).json({ message: "error", error: error.message , stack:error.stack });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db_service.findOne({
      model: userModel,
      filter: {
        email,
        provider: ProviderEnum.system,
      },
    });
    if (!user) {
      throw new Error("user Not Exist");
    }

    const match = Compare({plainText:password ,cipherText: user.password})

    if (!match) {
      throw new Error("Invalid Password", { cause: 400 });
    }

    sucessResponse({res, data:user})
  } catch (error) {
    return res.status(404).json({ message: "error", error: error.message });
  }
};

export const getProfile = async (req , res , next)=>{
  const  {id} = req.params
  const user = await db_service.findOne({model:userModel , filter:{_id:id} , select:"-password"})
  if(!user){
    throw new Error("user Not Exist" , {cause:400});
  }

sucessResponse({res, message:"Done" , data:{...user._doc , phone:decrypt(user.phone)}})

}
