import { CheckCircle } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { api } from "./service/api";

export const App = () => {
  const [status, setStatus] = useState([]);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const getStatus = () => {
    api
      .get("/api")
      .then((res) => setStatus(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  if (!status) {
    <div>
      <p>Loading...</p>
    </div>;
  }

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className="min-h-screen p-5">
      <main>
        <div className="w-full text-center flex flex-col items-center justify-center">
          <div className="grid gap-3 grid-rows xl:grid-cols-3">
            {status.map((item) => (
              <div
                className="w-full p-10 bg-white border-2 border-[#141414] rounded-3xl flex items-center justify-around text-black"
                key={item[0].id}
              >
                <div className="flex flex-col">
                  <h1 className="w-[350px] text-2xl font-bold uppercase">
                    {item[0].name}
                  </h1>
                  {item[0].status === "operational" ? (
                    <p className="text-lg font-medium uppercase">
                      Status: {item[0].status}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div>
                  {item[0].status === "operational" ? (
                    <CheckCircle className="text-green-500" size={32} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-10">
            <button
              className="p-2 px-10 border-2 font-bold border-red-500 rounded-3xl text-2xl hover:scale-110 transition-transform"
              onClick={refreshPage}
            >
              Atualizar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
