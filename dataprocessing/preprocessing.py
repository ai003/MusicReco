import pandas as pd


def preprocess(input_csv, output_csv):
    # Load the dataset
    df = pd.read_csv(input_csv)

    # rename
    if 'Unnamed: 0' in df.columns:
        df.rename(columns={'Unnamed: 0': 'row_id'}, inplace=True)

    # preprocess the data
    df = df.dropna(subset=['artists', 'album_name', 'track_name'])
    df = df.drop_duplicates(subset=['track_name', 'artists', 'album_name'])

    # save the cleaned data
    df.to_csv(output_csv, index=False)

    # display basic info
    print(df.head())
    print(df.info())


if __name__ == "__main__":
    preprocess('train.csv', "cleaned.csv")
