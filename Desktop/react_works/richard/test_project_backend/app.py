import os

from flask import Flask, jsonify, send_file
from flask_cors import CORS
from matplotlib import pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
import seaborn as sb


app = Flask(__name__)
CORS(app)


@app.route('/')
def get_data():
    if not os.path.exists(os.path.join(os.getcwd(), "temp_img")):
        os.mkdir("temp_img")

    data = [0,1,2,3]

    x1 = [0,1,2,3]
    y1 = [0,1,2,3]

    x2 = [0,1,2,3]
    y2 = [0,1,2,3] 

    #Apply seaborn styling
    sb.set()

    fig, axes = plt.subplots(1,2, figsize=(20,8))

    #Add title 
    plt.suptitle('Simulation Results')

    axes[0].plot(x1, y1)
    axes[1].plot(x2, y2)

    axes[0].set_xlabel('Series 1')
    axes[0].set_ylabel('Values')

    axes[1].set_xlabel('Series 1')
    axes[1].set_ylabel('Values')

    pp = PdfPages('temp_img/plot.pdf')
    plt.savefig(pp, format='pdf')
    pp.close()
    
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/export_to_pdf')
def export_to_pdf():
    pdf_file = os.path.join(os.path.join(os.getcwd(), "temp_img/plot.pdf"))
    abs_pdf_file = os.path.abspath(pdf_file)
    return send_file(abs_pdf_file, mimetype='application/pdf', as_attachment=True)



if __name__ == "__main__":
    app.run(debug=False)
