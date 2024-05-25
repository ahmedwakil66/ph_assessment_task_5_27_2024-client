/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

const BlogPdf = ({ qAndA }) => {
    return (
        <Document>
            {qAndA.map(each => {
                const { _id, question, answer } = each;
                return (
                    <Page key={_id}>
                        <View style={{ margin: '0 48px 48px 48px' }}>
                            <Text style={{margin: '16px 48px 16px', textAlign: 'center', fontSize: '10px'}}>Simply Recipes Blog</Text>
                            <Text style={{ fontSize: "24px", fontWeight: '500', marginBottom: '24px' }}>Q. {question}</Text>
                            <Text>Answer: {answer}</Text>
                        </View>
                    </Page>
                )
            })}
        </Document>
    );
};

export default BlogPdf;